# Udacity Project One: Image Processing API
Project Details: Project contains an Image processing Placeholder API and Image Scaling Library using Express, TypeScript, Jasmine, Eslint, and Prettier. 
End user can pass a file name, image hight and widtt ti display the image.

## To start the project follow the following steps:
### 1. Install [Node JS](https://nodejs.org/en) on your machine. 
### 2. Run all the following command's to start the server.
- Install Dependencies: npm install
- Build: npm run build
- Prettify: npm run prettify
- Lint: npm run lint
- Run unit tests: npm run test
- Start server: npm run start 

## Local port and host
1. The server will listen on port 3000:
2. local host address: http://localhost:3000/

Once your local is running you can pass the URL and values as the example below. 
####  How to pass URL values 
http://localhost:3000/api/images?filename=imageName&width=width&height=height

#### Values to pass: Pass one image name below width and height value. 
- _imageName_:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: positiveInteger
- _height_: positiveInteger

#### Example 1: Will scale the 'encenadaport' image to 200 by 200 pixels 
http://localhost:3000/api/images?filename=encenadaport&width=200&height=200

#### Example 2: Error message: Missing height or width error parameter will display.
http://localhost:3000/api/images?filename=encenadaport&width=200

