# Interview_Simulator
In this project, I used ReactJS and NodeJS with OpenAI's API to recreate create an AI multi-round simulator created to help prep for future techincal interviews. Rounds consist of providing the job posting and a mix of behavioural and techinical questions.
1. Make sure you have node installed. Once downloaded you can use code below to make sure its good to run:
   ```
   npm -v
   ```
  Also make sure you have nodemon installed. If you do not, cd into the backend and then run this line:
   ```
   npm install nodemon --save-dev
   ```
 2. Get an openai key (Money needed to use this API).
    For OpenAI, go to this link: https://openai.com/index/openai-api/
    Create an account if needed, go dashboard, and create an API key using the option on  the left and copy it down. Next go to 
     your profile in the top right and make sure there is money in your account under billing (even a few dollars can go a long 
     way).   
 3. Create a .env file in backend folder. Fill it out as such:
     ```
     PORT=4000
     FRONT_END_PORT = http://localhost:3000
     OPENAI_KEY=[YOUR OPENAI KEY]
     ```
     If you decide to use your own selected port numbers, you may need to change the backend port in package.json in the frontend folder.
    ```
    {
     "proxy": "http://localhost:4000", //RIGHT HERE
     "name": "frontend",
     "version": "0.1.0",
     "private": true,
    ```

    Create a .env file in frontend folder. Fill it out as such:
     ```
     VITE_BACK_END_PORT = http://localhost:4000
     ```
     Make sure the port number in the backend env file called "PORT" and in the frontend env file match. 
 4. Open two terminals. In one, cd to the frontend
     ```
     cd frontend
     ```
    In the other, cd to the backend
     ```
     cd backend
     ```
    In both terminals, run
     ```
     npm install 
     ```
    to download all dependencies needed.

 5. On the frontend terminal run
     ```
     npm run dev
     ```
     And on the backend terminal run
     ```
     npm run dev 
     ```
6. Now the project should run on localhost
