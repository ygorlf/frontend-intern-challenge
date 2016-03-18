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
		topFive(jsData);
	};

	xhr.send();

	btnSubmit.addEventListener('click', function(ev) {
			ev.preventDefault();

			var randomUrlSource = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j'];
			var shortenerUrl = 'http://chr.dc/';

			for(var i = 0; i<5; i++) {
				shortenerUrl += randomUrlSource[Math.floor(Math.random()*randomUrlSource.length)];
			}

			if (document.getElementById('url').value.startsWith('www.')) {
				document.getElementById('url').value = shortenerUrl;
			}
		});
})();