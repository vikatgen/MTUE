const select = document.getElementById("ametid");
const addButton = document.getElementById("amps");
const checkboxInput = document.getElementById("öötöö");
const totalSumBox = document.getElementById("answer");
const numberField = document.getElementById("tunnid");
const openAddModal = document.getElementById("addNewButton");
const addNewModal = document.getElementById("addNewModal");
const addContent = document.getElementById("addContent");
let totalSum = 0;

let occupations = {
	96: { name: "Prügimees", rate: 0},
	94: { name: "Kelner", rate: 0},
	91: { name: "Koristaja", rate: 0},
	83: { name: "Autojuht", rate: 0},
	74: { name: "Elektrik", rate: 0},
	71: { name: "Ehitaja", rate: 0},
	22: { name: "Arst", rate: 0},
	25: { name: "Tehnik", rate: 0},
	43: { name: "Raamatupidaja", rate: 0},
	52: { name: "Müüja", rate: 0},
	73: { name: "Õmbleja", rate: 0},
	92: { name: "Aednik", rate: 0},
	42: { name: "Klienditeenindaja", rate: 0}
}

// Loopime läbi "occupations" ja anname väärtused edasi <option> tagidele DOMis
for(let key in occupations) {
	select.options[select.options.length] = new Option(occupations[key].name, occupations);
}

// Ava sisetuse moodul "Lisa kirja" nupu vajutamisel
function openPanel() {
	document.getElementById("addNewModal").style.display ="block";
};

fetch('http://andmebaas.stat.ee/sdmx-json/data/PA627/7+10+18+19+22+28+30+31+35+36+37+39+41.3.1/all?startTime=2014&endTime=2014&dimensionAtObservation=allDimensions')
.then(response=>{
	return response.json()
})

.then(data => {
	data.structure.dimensions.observation[0].values.forEach((el, i) => {
		objectKey = el.name.split(' ')[0]
		key = i + ":0:0:0"
		rate = data.dataSets[0].observations[key][0]
		occupations[objectKey].rate = rate;
	})

	function addRow() {
		konf = checkboxInput.checked ? 1.5 : 1;
		sum = (occupations[objectKey].rate * numberField.value) * konf;
		totalSum += sum;
		totalSumBox.innerText = totalSum.toFixed(0);
		const newLiSum = document.createElement("li");
		newLiSum.classList.add('flex', 'w-full', 'justify-center', 'bg-purple-600', 'rounded-lg', 'py-3', 'px-6', 'text-white', 'mb-2');
		newLiSum.innerHTML = sum.toFixed(0) + " € " + occupations[objectKey].name;
		addContent.appendChild(newLiSum);
		document.getElementById("addNewModal").style.display ="none";
	};

	addButton.addEventListener('click', addRow)

	// nupp addEventListener('click', addRow)
	// - konf (if lause) - inout.value ? 1.5 või 1
	// - options valuele vastav rate * input value * konf
	// - genereeri uus rivi HTMLi (vastuserivi)
	// - total =+ sum
	// - muuda totalit HTMLis
});
















