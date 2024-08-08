## FUGU - Code Assignment - Backend

Node.JS server using Express that receives an email text and returns a sentiment analysis. This is part of the assignment for the role of Software Engineer at FUGU.

To run this project locally simply do:

```bash
npm run dev
```

You run the EC2 instance in the following address:

```bash
http://ec2-18-230-11-216.sa-east-1.compute.amazonaws.com:8080
```

The endpoint to analyze the email is /analyze-email. This endpoint is secured and needs a authorization to be passed on the header.

For more information about the endpoint, you can access the Swagger documentation at:

```bash
http://ec2-18-230-11-216.sa-east-1.compute.amazonaws.com:8080/api-docs
```
