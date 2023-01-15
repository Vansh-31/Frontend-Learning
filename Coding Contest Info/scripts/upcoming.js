console.time("St");
const Format_date_time = (date_time) => {
	date_time = date_time.substr(0, date_time.length - 5);
	date_time = date_time.replace("T", " at ");
	return date_time;
};
let imgs;
fetch(
	"https://api.unsplash.com/search/photos?page=1&query=programming&client_id=go0Xh_A7vIqJGPj81gO-fCacggrOQE0_FsSO-TUqJbU"
)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		// [Math.round(Math.random() * 10)].urls.full);
		imgs = data.results;
	});
fetch("https://kontests.net/api/v1/all")
	.then((response) => {
		return response.json();
	})
	.then((contests) => {
		let container = document.getElementById("cards-section");
		let ihtml = "";
        let is_empty = true;
		for (item in contests) {
			let start_date_time = Format_date_time(contests[item].start_time);
			let end_date_time = Format_date_time(contests[item].end_time);
			let url = contests[item].url;
			let title = contests[item].name;
			let img_url = imgs[Math.round(Math.random() * 9)].urls.small;
			
			if (contests[item].in_24_hours == "Yes") {
				ihtml += `<div class="card">
        <img src="${img_url}" alt="">
        <h5 class="card-title">${title}</h5>
        <p class="card-text"><a href="${url}">Visit here</a></p>
        <p class="card-text">Starts on : ${start_date_time}</p>
        <p class="card-text">Ends on : ${end_date_time}</p>
    </div>`;
				is_empty = false;
			}
			console.log(start_date_time);
		}
        if (is_empty)
        {
            document.getElementById("nothing").style.display = "flex"
        }

		container.innerHTML += ihtml;
	});
console.timeEnd("St");
