// Hey man, don't polute the global scope...
(function() {
	var xhr = new XMLHttpRequest();
	var btnSubmit = document.getElementById('shortener');
	var linksUrl = document.querySelectorAll('.link__url');
	var linksNumber = document.querySelectorAll('.link__number');

	xhr.open('GET', '../../Assets/urls.json', true);

	function topFive(arr) {
		var topFiveArr = [];
		arr.sort(function(a, b) {
			if (a.hits > b.hits) {
				return -1;
			} if (a.hits < b.hits) {
				return 1;
			} else {
				return 0;
			}
		});
		for(i=0; i<=5; i++) {
			topFiveArr.push(arr[i]);
		}
		topFiveArr.forEach(function(elem, index) {
			linksUrl[index].innerHTML = elem.shortUrl;
			linksNumber[index].innerHTML = elem.hits;
		});
	}

	xhr.onload = function() {
		var data = xhr.responseText;
		jsData = JSON.parse(data);

		btnSubmit.addEventListener('click', function(ev) {
			ev.preventDefault();
			var inputUrl = document.getElementById('url').value;

			jsData.forEach(function(elem, index) {
				if(elem.url.includes(inputUrl)) {
					document.getElementById('url').value = elem.shortUrl;
				}
			});
		});

		topFive(jsData);
	};

	xhr.send();
})();