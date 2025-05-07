
# Blog App Screenshots

This folder contains screenshots related to the process of deploying the Blog App on AWS.

## Contents of this Folder:

1. **EC2 Instances Screenshot**
   - A screenshot from the AWS EC2 Console showing the instances `renad-blog-backend` and `renad-blog-frontend`, including their Public IP and instance names.

2. **S3 Buckets Screenshot**
   - A screenshot from the AWS S3 Console showing the buckets `renad-blogapp-media1` and `renad-blogapp-frontend1`.

3. **Uploading an Image to Media Bucket Screenshot**
   - A screenshot from the S3 page after uploading an image, showing the image name and Media URL.

4. **SSH Connection to EC2 Screenshot**
   - A screenshot from the terminal showing a successful SSH connection to the EC2 instance.

5. **Backend Setup Screenshot**
   - A screenshot from the terminal after installing the necessary packages using `npm install` and starting the server with `pm2 start index.js`.

6. **Frontend Setup Screenshot**
   - A screenshot from the terminal after running `aws s3 sync dist/ s3://renad-blogapp-frontend1` to upload the frontend files to S3.

7. **Testing the App Screenshot**
   - A screenshot from the browser showing the newly created Blog with a title and image.

---

## Steps for Taking and Uploading Screenshots:

1. **EC2 Instances Screenshot:**
   - Go to the AWS EC2 Console and make sure the instances `renad-blog-backend` and `renad-blog-frontend` are running.
   - Take a screenshot of the instances, including their Public IP and instance names.

2. **S3 Buckets Screenshot:**
   - Go to the AWS S3 Console and ensure that the buckets `renad-blogapp-media1` and `renad-blogapp-frontend1` exist.
   - Take a screenshot of the S3 Console showing both buckets.

3. **Uploading an Image to Media Bucket:**
   - Upload an image to the S3 Media Bucket `renad-blogapp-media1`.
   - Take a screenshot of the S3 page showing the image, including its name and Media URL.

4. **SSH Connection to EC2:**
   - Use SSH to connect to your EC2 instance by running the following command in the terminal:
     ```bash
     ssh -i "path_to_your_pem_file.pem" ubuntu@your-ec2-public-ip
     ```
   - Take a screenshot showing the successful connection to the EC2 instance.

5. **Backend Setup:**
   - SSH into the EC2 instance and navigate to the backend directory.
   - Run `npm install` to install the necessary packages.
   - Start the backend server using `pm2 start index.js`.
   - Take a screenshot of the terminal showing the successful installation and the backend server running.

6. **Frontend Setup:**
   - SSH into the EC2 instance and navigate to the frontend directory.
   - Run the following command to upload the frontend files to S3:
     ```bash
     aws s3 sync dist/ s3://renad-blogapp-frontend1
     ```
   - Take a screenshot of the terminal showing the successful upload.

7. **Testing the App:**
   - Open the frontend application in the browser.
   - Add a new Blog with a title and image.
   - Take a screenshot showing the newly created Blog (title + image) in the browser.

---

## Key Learnings:

1. **Setting up EC2 Instances:**
   - We learned how to set up and manage EC2 instances on AWS, ensuring that both backend and frontend instances are properly configured and running.

2. **Working with S3 Buckets:**
   - We learned how to create and manage S3 buckets to store media and frontend assets, and how to upload and retrieve files using AWS S3.

3. **SSH Connection:**
   - We learned how to securely connect to EC2 instances using SSH, which is essential for managing and configuring remote servers.

4. **Backend Setup:**
   - We learned how to install dependencies using `npm` and run a Node.js backend server using `pm2` to keep the server running in the background.

5. **Frontend Deployment:**
   - We learned how to sync the frontend build directory with an S3 bucket using the `aws s3 sync` command, ensuring that the frontend is served correctly from S3.

6. **Testing and Debugging:**
   - We learned how to test the application by adding new blog posts and verifying that everything works as expected in both the backend and frontend.

---

**Note:** These steps and screenshots are part of the process of deploying the Blog App on AWS, and the images provided here help illustrate each stage of the deployment.
