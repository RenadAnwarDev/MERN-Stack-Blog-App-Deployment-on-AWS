import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { toast } from 'react-toastify';

// Define interfaces for posts and comments

interface IBlogContext {
  getBlog: (id: string) => Promise<void>;
  getBlogs: () => Promise<void>;
  createBlog: (
    data: IBlogForm,
    navigate: (path: string) => void
  ) => Promise<void>;
  addComment: (id: string, content: string) => Promise<void>;
  deleteBlog: (id: string, navigate: (path: string) => void) => Promise<void>;
  addLike: (slug: string, id: string) => Promise<void>;
  updateBlog: (
    data: IBlogForm,
    navigate: (path: string) => void,
    id: string
  ) => Promise<void>;
  currentBlog: ISingleBlog | null;
  blogs: IBlog[];
  categories: IBlogCategory[];
  getCategories: () => Promise<void>;
  paginationData: IPaginationData;
  page: number;
  setPage: Dispatch<SetStateAction<number>>; // Corrected type
}

const BlogContext = createContext<IBlogContext>({
  getBlog: async () => {},
  getBlogs: async () => {},
  createBlog: async () => {},
  addComment: async () => {},
  deleteBlog: async () => {},
  addLike: async () => {},
  updateBlog: async () => {},
  currentBlog: null,
  blogs: [],
  categories: [],
  getCategories: async () => {},
  paginationData: {} as IPaginationData,
  page: 1,
  setPage: () => {},
});

// const baseUrl = 'https://33000.fullstack.clarusway.com';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [currentBlog, setCurrentBlog] = useState<ISingleBlog | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<IBlogCategory[]>([]);

  const [page, setPage] = useState<number>(1);
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    count: 0,
    next: false,
    previous: false,
    totalPages: 0,
  });

  useEffect(() => {
    if (page) {
      getBlogs(page);
    }
  }, [page]);

  // Get all posts
  const getBlogs = async (page?: number) => {
    let url = `${baseUrl}/blogs/?limit=10`;
    if (page) {
      url = `${baseUrl}/blogs/?limit=10&page=${page}`;
    }
    try {
      const { data } = await axios<IBlogs>(url);
      setBlogs(data.data);
      setPaginationData({
        count: data.details.totalRecords,
        next: data.details.pages.next,
        previous: data.details.pages.previous,
        totalPages: Math.ceil(data.details.totalRecords / 10),
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Get a single post
  const getBlog = async (id: string) => {
    try {
      // Get user info from localStorage
      const storedUser = localStorage.getItem('user');

      // Fallback to authenticated access if public fails
      const token = storedUser ? JSON.parse(storedUser).token : '';

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Only add Authorization header if token exists
      if (token) {
        headers.Authorization = `Token ${token}`;
      } else {
        throw new Error('Authentication required to view this blog post');
      }

      const { data } = await axios.get(`${baseUrl}/blogs/${id}`, {
        headers,
      });

      setCurrentBlog(data.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Create Post
  const createBlog = async (
    data: IBlogForm,
    navigate: (path: string) => void
  ) => {
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    try {
      await axios.post(`${baseUrl}/blogs`, data, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Add a comment to a post
  const addComment = async (id: string, comment: string) => {
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    try {
      await axios.post(
        `${baseUrl}/comments`,
        { postId: id, content: comment },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      getBlog(id);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Delete a post using its id
  const deleteBlog = async (id: string, navigate: (path: string) => void) => {
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    try {
      await axios.delete(`${baseUrl}/blogs/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Post deleted successfully!');
      navigate('/'); // navigate to a different page if necessary
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Add a like to a post
  const addLike = async (slug: string, id: string) => {
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    try {
      await axios.post(
        `${baseUrl}/like/${slug}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      getBlog(id); // Refresh the posts list
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Update a post using its id
  const updateBlog = async (
    data: IBlogForm,
    navigate: (path: string) => void,
    id: string
  ) => {
    const token = JSON.parse(localStorage.getItem('user') || '{}').token;
    try {
      await axios.put(`${baseUrl}/blogs/${id}`, data, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Post updated successfully!');
      navigate('/');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/categories/`);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const value = {
    blogs,
    getBlog,
    getBlogs,
    createBlog,
    deleteBlog,
    addComment,
    addLike,
    updateBlog,
    currentBlog,
    categories,
    getCategories,
    paginationData,
    setPage,
    page,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBlog = () => useContext(BlogContext);
