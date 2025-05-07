# MERN Stack Blog App Deployment on AWS

This README provides the steps taken to deploy the MERN Stack Blog App on AWS. 

## 1. Setup EC2 Instances
- Created two EC2 instances: 
  - renad-blog-backend 
  - renad-blog-frontend
- Both instances were set up with public IPs.

## 2. Configure S3 Buckets
- Created two S3 buckets: 
  - renad-blogapp-media1
  - renad-blogapp-frontend1
- These buckets were used to store media and frontend files respectively.

## 3. Upload Media to S3 Bucket
- Uploaded an image to the `renad-blogapp-media1` bucket. 
- The image URL was generated and used for the blog app.

## 4. SSH Connection to EC2
- Successfully connected to EC2 instances via SSH using the PEM key:
  - `Renad-key-2025.pem`
  
## 5. Backend Setup
- On the backend instance, the following steps were taken:
  1. Installed necessary packages using `npm install`.
  2. Started the backend server using `pm2 start index.js` to run the app in the background.

## 6. Frontend Setup
- Deployed the frontend to S3 using the AWS CLI:
  - Ran the command: `aws s3 sync dist/ s3://renad-blogapp-frontend1`.
  - The frontend is now hosted on S3 and accessible via the provided URL.

## 7. Testing the App
- Opened the frontend URL and added a new blog post with a title and an image.
- Verified that the new blog was displayed correctly on the frontend.

## Lessons Learned
- How to configure EC2 instances and S3 buckets for app deployment.
- How to set up a backend server using Node.js and manage it with PM2.
- How to deploy a frontend app to AWS S3.
- How to connect and manage instances via SSH.
