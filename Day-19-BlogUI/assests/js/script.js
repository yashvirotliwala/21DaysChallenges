// script.js

const blogs = [
{
title:"The Future of Web Design",
desc:"Discover how AI, animation, and modern UX are changing websites forever.",
img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085"
},
{
title:"Master Frontend in 2026",
desc:"A roadmap to become a top frontend developer using HTML, CSS, JS & React.",
img:"https://images.unsplash.com/photo-1518770660439-4636190af475"
},
{
title:"Minimalist Productivity Setup",
desc:"Build a clean workspace that boosts creativity and focus every day.",
img:"https://images.unsplash.com/photo-1497366754035-f200968a6e72"
},
{
title:"Why Personal Branding Matters",
desc:"Grow online presence and get more career opportunities in digital world.",
img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
}
];

const blogContainer = document.getElementById("blogContainer");
const searchInput = document.getElementById("searchInput");

function displayBlogs(data){
  blogContainer.innerHTML = "";

  data.forEach(blog=>{
    blogContainer.innerHTML += `
      <div class="card">
        <img src="${blog.img}" alt="">
        <div class="card-content">
          <h3>${blog.title}</h3>
          <p>${blog.desc}</p>
          <button>Read More</button>
        </div>
      </div>
    `;
  });
}

displayBlogs(blogs);

searchInput.addEventListener("keyup", ()=>{
  const value = searchInput.value.toLowerCase();

  const filtered = blogs.filter(blog =>
    blog.title.toLowerCase().includes(value)
  );

  displayBlogs(filtered);
});