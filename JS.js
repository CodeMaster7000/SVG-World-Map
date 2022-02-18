const countries = document.querySelectorAll('path');
const svg = document.querySelector('svg');
const initialViewBox = svg.getAttribute('viewBox');
const cleanViewBox = ({x,y,width, height}) => {
	return [x, y, width, height].map(v => parseInt(v, 10)).join(' ')
}

svg.addEventListener('click', function({target}) {
	if(target.nodeName === "path") {		
		let activeElement = document.querySelector('.selected')
		if(activeElement) {
			activeElement.classList.remove('selected');
		}
 		
		target.classList.add('selected');		
		TweenMax.to('svg', 2, { attr: {viewBox: cleanViewBox(target.getBBox()) }, ease:Power2.easeInOut })
	
		countryName(target, 2400);
	}
})

function countryName (path, time = 2000) {
	
	let name = path.getAttribute('data-name'), 
		 code = path.id, 
		 toast = document.createElement('div');
	
	toast.classList.add('toast');
	toast.textContent = `${name || 'N/A'} (${code})`;
	document.body.appendChild(toast);
	
	setTimeout(() => {
		toast.classList.add('leave')
		toast.addEventListener('animationend', ({target}) => {
			target.parentNode.removeChild(target);
			TweenMax.to(svg, (time / 1000), { attr: { viewBox:initialViewBox }, ease:Power2.easeInOut })
				let activeElement = document.querySelector('.selected')
				if(activeElement) {
					activeElement.classList.remove('selected');
				}
		})
	}, time)
	
}
