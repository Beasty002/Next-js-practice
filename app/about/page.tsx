import ButtonComponent from "./button";

export default async function AboutPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log(posts);
  console.log("About Page");
  return (
    <h1>
      About page <ButtonComponent />
    </h1>
  );
}
