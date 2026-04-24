const slidesData = [
    {
        images: [
            "https://media.istockphoto.com/id/1473666403/photo/deep-forest-waterfall-in-thailand-erawan-waterfall-national-park-kanjanaburi-thailand.jpg?s=612x612&w=0&k=20&c=weBEF1fecZcspR3wqZz79ZmH4fnauLTqy9A4xEb8xi4=",
            "https://t4.ftcdn.net/jpg/06/12/10/03/360_F_612100393_TNOmwXGZbmBMTJ6Kl9YWmAPERxKFCCTK.jpg",
            "https://navbharattours.com/wp-content/uploads/thumb_720_450_Jungledreamstime_l_56902828.jpg",
            "https://assets.cntraveller.in/photos/62cec94f5ef6672406ac7294/4:3/w_3264,h_2448,c_limit/650031609"
        ],
        title: "jungle"
    },
    {
        images: [
            "https://www.ecowatch.com/wp-content/uploads/2025/05/GettyImages-1453838542-scaled.jpg",
            "https://cff2.earth.com/uploads/2023/06/02100547/Mountain-2.jpg",
            "https://m.media-amazon.com/images/I/71K4EWjvoPL._AC_UF894,1000_QL80_.jpg",
            "https://media.timeout.com/images/106041640/image.jpg"
        ],
        title: "mountains"
    },
    {
        images: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/41/de/c4/indian-river-tour.jpg?w=1200&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/c9/92/5e/laguna-azul.jpg?w=1200&h=-1&s=1",
            "https://images.unsplash.com/photo-1724169913981-f300a24f859b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
            "https://thumbs.dreamstime.com/b/spring-summer-landscape-blue-sky-clouds-river-boat-green-trees-narew-countryside-grass-poland-water-leaves-58070004.jpg"
        ]
    },
    {
        images: [
            "https://www.amazingasiatours.com/wp-content/uploads/2023/07/Thailand-beach.jpg",
            "https://hblimg.mmtcdn.com/content/hubble/img/goa/mmt/destination/m_destination-goa-landscape_l_400_640.jpg",
            "https://static.toiimg.com/photo/48538866.cms",
            "https://cdn.sanity.io/images/b2yibrs1/production/7839ec4afebf4e3946367689301c593e78dda205-2526x1865.jpg?w=2000"
        ]
    }
];

const container = document.querySelector(".slide-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let groupIndex = 0;
let imageIndex = 0;
let interval;

// Load group images
function loadGroup(index) {
    container.innerHTML = ""; // clear old images

    slidesData[index].images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;

        if (i === 0) img.classList.add("active");

        container.appendChild(img);
    });

    imageIndex = 0;

    container.classList.add("slide-in");
    setTimeout(() => container.classList.remove("slide-in"), 500);

    startFade();
}

// Fade animation inside group
function startFade() {
    clearInterval(interval);

    const images = container.querySelectorAll("img");

    interval = setInterval(() => {
        images[imageIndex].classList.remove("active");

        imageIndex = (imageIndex + 1) % images.length;

        images[imageIndex].classList.add("active");
    }, 2000); // change every 2 sec
}

// Next group
nextBtn.addEventListener("click", () => {
    groupIndex = (groupIndex + 1) % slidesData.length;
    loadGroup(groupIndex);
});

// Previous group
prevBtn.addEventListener("click", () => {
    groupIndex = (groupIndex - 1 + slidesData.length) % slidesData.length;
    loadGroup(groupIndex);
});

// Init
loadGroup(groupIndex);