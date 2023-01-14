url = "https://kontests.net/api/v1/all";
fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((contests) => {
		let container = document.getElementById("cards-section");
        let ihtml = "";
		for (item in contests) {
			ihtml += `<div class="card">
        <img src="../images/logo.png" alt="">
        <h5 class="card-title">${contests[item].name}</h5>
        <p class="card-text"><a href="${contests[item].url}">Visit here</a></p>
        <p class="card-text">Starts at : ${contests[item].start_time}</p>
        <p class="card-text">Ends at : ${contests[item].end_time}</p>
        <a href=""></a>
    </div>`;
		}
		container.innerHTML += ihtml;
	});
