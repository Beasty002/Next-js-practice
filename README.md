npx create-next-app is used to create the the project
app folder is hwere we do all the routing as next js is file based routing and we are using app routing so file based routing the component name doesnt matter much its the name of the file taht matters
the page.tsx is the main page that starts with '/' 
the childer inside of the layout.tsx is where the routing of all page are shown in and if we add other contents alongside the children it will always be shown
to create a new route we do is create new folder and then inside it we create page.tsx and viola it works u just created a new page eg : say we created about folder in app folder and inside the about folder we created a component page.tsx now if we go to /about thenn that page.tsx contents inside of the about folder is shown
for navigation we use the Link tag from next/link to move between pages <Link href={"/"}>Home</Link> , it is similar to the a tag where we use the href
