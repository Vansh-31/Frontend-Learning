console.time("St");
const upcoming = (start) => {
	let curr = new Date();
	let curr_date = curr.getDate();
	let curr_month = curr.getMonth() + 1;
	let start_date = parseInt(start.substr(8, 2));
	let start_month = parseInt(start.substr(5, 2));
	console.log("CURR DATE : ", curr_date);
	console.log("CURR MONTH : ", curr_month);
	console.log("START DATE : ", start_date);
	console.log("START MONTH : ", start_month);
	if (start_month == curr_month) {
		return curr_date + 2 >= start_date;
	} else if (start_month == curr_month + 1) {
		return (
			(curr_date + 2) % 31 == start_date ||
			(curr_date + 2) % 31 == start_date + 1
		);
	}
	return false;
};
const Format_date_time = (date_time) => {
	date_time = date_time.substr(0, date_time.length - 5);
	date = date_time.substr(0, 10);
	time = date_time.substr(11);
	hrs = parseInt(time.substr(0, 2));
	mins = parseInt(time.substr(3, 5));
	if (mins + 30 >= 60) {
		hrs++;
	}
	hrs = String((hrs + 5) % 24);
	mins = String((mins + 30) % 60);
	if (hrs.length < 2) {
		hrs = "0" + hrs;
	}
	if (mins.length < 2) {
		mins = "0" + mins;
	}
	return `${date} at ${hrs}:${mins}`;
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
	};
	name = name.split(" ");
	for (let index = 0; index < name.length; index++) {
		name[index] = name[index].toLowerCase();
	}
	for (const word of name) {
		if (word in famous_platforms) {
			url = famous_platforms[word];
			break;
		}
	}
	return url;
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
			let img_url = update_img(
				imgs[Math.round(Math.random() * 9)].urls.small,
				title
			);

			if (upcoming(start_date_time)) {
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
		if (is_empty) {
			document.getElementById("nothing").style.display = "flex";
		}

		container.innerHTML += ihtml;
	});
console.timeEnd("St");
