let query = window.location.search.substring(1);
let parameters = []; if(query != null) {parameters = query.split("&")}
let fltrBttns = document.querySelectorAll("[data-filter]");

// update query parameters
function insertUrlParam(key, value) {
    if (history.pushState) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        if(value == "") {newurl = window.location.protocol + "//" + window.location.host + window.location.pathname}
        window.history.pushState({path: newurl}, '', newurl);
    }
}

// update query when division button is clicked
fltrBttns.forEach((bttn) => {
	bttn.addEventListener("click", () => {
		if(bttn.textContent == "All") {
			// reset params
			newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
			window.history.pushState({path: newurl}, '', newurl)
		}
		else {insertUrlParam("div", bttn.dataset.filter.substring(1).toLowerCase().replace(" ", "-"))}
	})
})

// auto-select division from url query
if(query == "") {
	fltrBttns.forEach((bttn) => {
		if(bttn.textContent == "All") {
			setTimeout(() => {bttn.click()}, 500);
		}
	})
}
else {
	parameters.forEach((param) => {
		let pair = param.split("=");
		if(pair[0] == "div") {
			for(let i = 0; i < fltrBttns.length; i++) {
				if(fltrBttns[i].dataset.filter.substring(1).toLowerCase().replace(" ", "-") == pair[1]) {
					setTimeout(() => {fltrBttns[i].click()}, 500)
				}
			}
		}
	})
}