/* eslint-env browser */

class ElectricLink extends HTMLAnchorElement {
	connectedCallback() {
		this.addEventListener("click", this.follow.bind(this));
	}

	follow(ev) {
		// TODO: configurable timeout
		// TODO: request header?
		// TODO: fire events when things happen
		fetch(this.href).then(response => {
			// TODO: probably support for redirect
			if(!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
			}
			return response.text();
		}).then(html => {
			let doc = parseHTMLFromString(html);
			// TODO: make selector configurable
			replaceSelector(doc, "#main");
			replaceSelector(doc, "title");
			history.pushState({}, "", this.href);
		}).catch(_ => {
			window.location.replace(this.href);
		});
		ev.preventDefault();
	}

	get href() {
		return this.getAttribute("href");
	}
}

if(window.fetch && window.history && window.DOMParser) {
	customElements.define("electric-link", ElectricLink, { extends: "a" });
}

function parseHTMLFromString(html) {
	return new DOMParser().parseFromString(html, "text/html");
}

// TODO: make configurable, so that brave folks can use morphdom
function replaceSelector(newNode, selector) {
	let oldContent = document.querySelector(selector);
	let newContent = newNode.querySelector(selector);

	if(oldContent && newContent) {
		let container = oldContent.parentNode;
		container.insertBefore(newContent, oldContent);
		container.removeChild(oldContent);
	}
}
