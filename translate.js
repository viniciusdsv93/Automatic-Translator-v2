const axios = require("axios");
const fs = require("fs");

let object = {
	ART_SEGMENT: "Art",
	FOOD_AND_DRINKS_SEGMENT: "Food and Drinks",
	AUTOMOTIVE_SEGMENT: "Automotive",
	CREATOR_CREATOR: "Creator",
};

async function getData(translateTo) {
	let targetObject = {};
	for await (let obj of Object.entries(object)) {
		await axios
			.get(
				`http://localhost:3000?detect_linguage=en&translate_to=${translateTo}&text=${obj[1]}`
			)
			.then((resp) => {
				targetObject[obj[0]] = resp.data.response;
			});
	}
	fs.writeFile(
		`translated-${translateTo}.json`,
		JSON.stringify(targetObject),
		(err) => {
			if (err) throw err;
			console.log("File successfully created");
		}
	);
	return targetObject;
}

(async function () {
	console.log(await getData("es"));
	console.log(await getData("ar"));
	console.log(await getData("pt"));
	console.log(await getData("de"));
	console.log(await getData("fr"));
	console.log(await getData("ja"));
	console.log(await getData("ko"));
	console.log(await getData("ru"));
	console.log(await getData("zh-CN"));
	console.log(await getData("zh-TW"));
})();
