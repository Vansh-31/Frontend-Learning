console.time("St");
const Format_date_time = (date_time) => {
	date_time = date_time.substr(0, date_time.length - 5);
	date = date_time.substr(0, 10);
	time = date_time.substr(11);
	hrs = parseInt(time.substr(0, 2));
	mins = parseInt(time.substr(3, 5));
	if (mins + 30 >= 60) {
		hrs++;
	}
	hrs = String(((hrs+5)%24))
	mins = String(((mins+30)%60))
	if (hrs.length<2)
	{
		hrs = "0" + hrs
	}
	if (mins.length<2)
	{
		mins = "0" + mins
	}
	return (`${date} at ${hrs}:${mins}`)
};
const update_img = (url, name) => {
	famous_platforms = {
		codechef: "../images/codechef.jpeg",
		starters: "../images/codechef.jpeg",
		codeforces: "../images/codeforces.jpeg",
		weekly: "../images/leetcode.png",
		biweekly: "../images/leetcode.png",
		round: "../images/kickstart.jpeg",
		kickstart: "../images/kickstart.jpeg",
		"kick start": "../images/kickstart.jpeg",
	};
	name = name.split(" ");
	for (let index = 0; index < name.length; index++) {
		name[index] = name[index].toLowerCase();
	}
	changed = false;
	for (const word of name) {
		if (word in famous_platforms) {
			changed = true;
			url = famous_platforms[word];
			break;
		}
	}
	return [url, changed];
};
let imgs;
fetch(
	"https://api.unsplash.com/search/photos?page=1&query=programming&client_id=go0Xh_A7vIqJGPj81gO-fCacggrOQE0_FsSO-TUqJbU"
)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		imgs = data.results;
	});
fetch("https://kontests.net/api/v1/all")
	.then((response) => {
		return response.json();
	})
	.then((contests) => {
		let container = document.getElementById("cards-section");
		let ihtml = "";
		for (item in contests) {
			let start_date_time = Format_date_time(contests[item].start_time);
			let end_date_time = Format_date_time(contests[item].end_time);
			let url = contests[item].url;
			let title = contests[item].name;
			let img_url = update_img(
				imgs[Math.round(Math.random() * 9)].urls.small,
				title
			);
			if (img_url[1]) {
				ihtml += `<div class="card">
                <img src="${img_url[0]}" alt="">
                <h5 class="card-title">${title}</h5>
                <p class="card-text"><a href="${url}">Visit here</a></p>
                <p class="card-text">Starts on : ${start_date_time}</p>
                <p class="card-text">Ends on : ${end_date_time}</p>
                </div>`;
			}
		}
		container.innerHTML += ihtml;
	});
console.timeEnd("St");
