Prompt #3: An explanation of Handlebars and the concepts behind template engines

### Setup and Intro

Handlebars is a template engine with a syntax closely aligned with standard HTML. I decided to use it in my projects for this reason and because of its similarity to Django’s templating syntax, which I am familiar with. express-handlebars is an npm module that was created to streamline the use of Handlebars with Express. The main difference is that with express-handlebars there’s no need to use any client side Javascript; any work done on the template can be done on the back end. There is also no need to manually compile (or pre-compile) templates as is the case with Handlebars, which requires the use of a function for compilation. 
<br><br>
I’m demonstrating the use of Handlebars with a simple app to keep track of travel destinations.
<br><br>
Start by installing the view engine:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/518f5bc1-1eba-43e8-8d72-b62c25f71696)
<br><br>
There are a few ways to set up with varying levels of access to the underlying API. For my projects I imported the engine factory function directly and entered in configuration details while setting the Express template engine.
<br><br>
app.js:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/dd9dcb76-4fa1-4534-b40d-baa11ace6066)
<br><br>
Register express-handlebars as the template engine using app.engine. This also allows registration of a template engine under a different file extension, which is useful in the case of Handlebars because it has a long name:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/70578b17-95d0-404a-9f37-b1dda2170b92)
<br><br>
express-handlebars uses the structural concept of layouts. A layout template allows for easy repetition of HTML elements across multiple pages. Other templates can plug their HTML elements into the layout template to display data specific to a page. layoutsDir is the directory where these layouts will be stored and specifying this, as in the above code, allows for easier access when rendering the page with Javascript.
<br><br>
Now the view engine setting can be set with the custom abbreviated file extension:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/c8b27331-d7b7-4234-bfa0-717b0a9e7fc3)
<br><br>
This code allows for the omission of the file extension when using res.render, so this can be written:
 <br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/9535f253-a47f-4639-bc88-6e58d299950f)
<br><br>
Instead of this:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/2be04455-2e32-47ec-9a9a-a34a2c7d626f)
<br><br>
As usual, the views directory must be set as well. res.render will look up the view file relative to the path set here:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/da3b674f-c665-4bc1-b420-55068543d171)

### A syntax interlude:

Handlebars expressions are written with mustaches. This describes where properties of the context object, which is passed to the template using Javascript, will show up on the page:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/c16ddc2a-658b-4e27-ab73-17ab6108866b)
<br><br>
Nesting is captured with Javascript object query syntax:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/773e2e99-7d97-42ff-ba23-891c5194586b)
<br><br>
A triple mustache is mainly used to describe where in the layout template the other templates will plug their elements into. It can also be used to prevent the automatic HTML escaping done by Handlebars as a safety measure:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/ce69cfa4-9a4e-4738-9f1f-145d628c1a75)
<br><br>
Context changing allows access to data to accomplish varying tasks like iteration and logic. Within a Handlebars expression, # denotes the beginning or the context change and the / denotes the end. Handlebars has a number of built-in context changers that perform familiar operations. A few basic ones are:<br>
&nbsp;&nbsp;<code>with</code> - changes the context to the specified property, allowing more concise access to those properties<br>
&nbsp;&nbsp;<code>each</code> - performs iteration of a list<br>
&nbsp;&nbsp;<code>if</code> - performs conditional logic
<br><br>
The above example with navigation links could be written as follows:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/ad8ff14c-913f-4634-b02e-be293dc88180)
<br><br>
If accessing a simple list, “this” can be used to reference the current element.
<br><br>
For example, the following:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/6bd95342-03bf-4b54-a4fc-d74055800187)
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/934910f7-1cd4-4579-b6c2-263759d6a5d6)
<br>
Would display:<br>
1<br>
2<br>
3<br>
4<br>
5<br>

### A look at the templates:

My templates have been structured as follows, with a parent views directory and a child layouts directory containing any layout templates. The rest of the template files are in views:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/af01c58a-7b2e-4d26-a575-4d6a6f4a4c94)
<br><br>
This is the only layout template I’m using for this example but others could be created for various needs. 
main.hbs:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/92c9c972-5ab6-4eac-a49c-cbfa7bddf4e4)
<br><br>
The body of this document will be plugged in to where {{{body}}} is on the layout template.
home.hbs:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/c5923a8a-c116-42ab-b050-1024347d16bb)
<br><br>
The basic code for getting a template to display in the browser is as follows.
render.js:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/a59d176d-f97f-479f-9e6a-d2e97d091f5d)
<br><br>
‘home’ is the template that is to be plugged into the layout, and the layout (‘main’ in this case) is specified in the context-object. Any data that is to be passed into either template will be put into this object. 
<br><br>
Note: It would be better design to not pass data into the layout template and the above example with navigation links is purely for demonstration. The purpose of the layout is to reduce code repetition and the same data would have to be entered into every context object using the main.hbs layout.
<br><br>
Handlebars has a newer security feature that will only allow access to own-properties of the context object. This effectively means that either the Mongoose object will have to be converted to a JSON or Javascript object, or the values from the Mongoose object will have to be destructured and then entered into the context object manually. It’s easier to use the lean() method built into Mongoose to convert the Mongoose object into a Javascript object.
<br><br>
The following searches the database for the list of travel destinations, converts that object to Javascript, and then enters that object (or list of objects) into the context object.<br>
render.js:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/64f11471-60e0-46c2-bc5c-ec36daff5630)
<br><br>
That list is then displayed using #each<br>
home.hbs:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/28a24338-1ecd-4173-ac4d-62243b8c3810)
<br><br>
Flash messages can be displayed by passing in the message and using some logic in the template. I have been passing them in with res.redirect() using query strings<br>
render.js:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/d7170a5b-9b54-44be-9c3b-2937b9a67028)
<br><br>
Then in the homePage rendering function.<br>
render.js:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/6d89321b-6c79-45b7-9253-d059c9029787)
<br><br>
And finally, displayed in the template.<br>
home.hbs:
<br>
![Alt text](https://github.com/s-hatch/CSCIE-31_graduate_assignment/assets/113044909/8b501ec8-4af9-4fd0-8b08-fbf6228382c9)
<br><br><br>
This all can be tied together by returning to the engine factory function used when setting the template engine with app.set(). This function references, and registers with Express, another function called renderView(), which is used by Express to bind one template within another layout template. In the code, this is accessed with res.render().
