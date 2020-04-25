'use strict';

const _app = {
	helpers: {
		createCssTextFromObj(obj) {
			let style = ``;
			if(typeof obj === 'object' && Object.keys(obj).length) {
				for (let key in obj) {
					if(obj.hasOwnProperty(key)) {
						style += `${key}: ${obj[key]};\n`
					}
				}
				style += 'display: none;'
				return style;
			}
		},
		getElementPosition(el) {
			return el && el.getBoundingClientRect();
		},
		setTooltipToElement(el, tooltip) {
			let getNecessaryStyle = () => tooltip.style.cssText += this.createCssTextFromObj(this.calculateCoordinatesForTooltip(el, tooltip));
			this.setEventListenerFor(el, 'mouseover', function () {
				getNecessaryStyle();
				document.body.appendChild(tooltip);
				let ifNone = document.querySelector(`div[_app=${tooltip.getAttribute('_app')}]`);
				if(ifNone && ifNone.style.display === 'none') {
					tooltip.style.display = 'block';
					document.body.appendChild(tooltip);
				}
			});
			this.setEventListenerFor(el, 'mouseleave', function () {
				let ifNone = document.querySelector(`div[_app=${tooltip.getAttribute('_app')}]`);
				if(ifNone && ifNone.style.display === 'block') {
					tooltip.style.display = 'none';
					document.body.removeChild(tooltip);
				}
			})
		},
		CreateToolTip({styles, content, name}) {
			const el = document.createElement('div');
			el.setAttribute('_app', name);
			el.textContent = content;
			el.style.cssText = _app.helpers.createCssTextFromObj(styles);
			document.body.appendChild(el);
			return el;
		},
		calculateCoordinatesForTooltip(el,tooltip) {
			const currentPosition  = this.getElementPosition(el);
			return {
				position: 'absolute',
				top: `${(currentPosition.top + pageYOffset) - (parseFloat(tooltip.style.height) + 5)}px`,
				left: `${(currentPosition.left + pageXOffset) - (parseFloat(tooltip.style.width) / 2)}px`
			};
		},
		setEventListenerFor(el ,type, handler) {
			el.addEventListener(type, handler);
		}
	},
	elements: {
		box: document.querySelector('.box'),
		box2: document.querySelector('.box2'),
	}
};


_app.helpers.setTooltipToElement(
	_app.elements.box,
	_app.helpers.CreateToolTip({
			name: 'firstToolTip',
			styles: { width: '50px', height: '50px', background: 'yellow' },
			content: 'First Tooltip'
		})
)
_app.helpers.setTooltipToElement(
	_app.elements.box2,
	_app.helpers.CreateToolTip({
		name: 'secondTooltip',
		styles: { width: '150px', height: '150px', background: 'lightSkyBlue', color: 'white' },
		content: 'Second Tooltip'
	})
)



