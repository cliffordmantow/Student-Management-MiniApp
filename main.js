const students = [
    {
        NIM: 105021810058,
        fullName: "Clifford Mantow",
        gender: "Male",
        faculty: "Fakultas Ilmu Komputer",
        prodi: "Informatika"
    },
    {
        NIM: 105021910056,
        fullName: "Virginia Muaja",
        genders: "Female",
        faculty: "Fakultas Ekonomi dan Bisnis",
        prodi: "Akuntansi"
    }
]

const daftarFakultas = [
	{
        fakultas:"Fakultas Ilmu Komputer",
        jurusan: [
            'Informatika', 
            'Sistem Informasi'
        ]
	},
	{
		fakultas:"Pascasarjana",
        jurusan: [
            'Magister Manajemen',
            'Magister Teologi'
        ]
	},
	{
		fakultas:"Fakultas Filsafat",
		jurusan: [
            'Ilmu Filsafat'
        ]
	},
	{
		fakultas:"Fakultas Keguruan dan Ilmu Pendidikan",
		jurusan: [
			'Pendidikan Agama',
			'Pendidikan Bahasa Inggris',
			'Pendidikan Ekonomi',
            'Pendidikan Luar Sekolah'
        ]
	},
	{
		fakultas:"Fakultas Ekonomi dan Bisnis",
		jurusan: [
            'Akuntansi', 
            'Manejemen'
        ]
	},
	{
		fakultas:"Fakultas Pertanian",
		jurusan: [
            'Agroteknologi'
        ]
	},
	{
		fakultas:"Fakultas Keperawatan",
		jurusan: [
            'Profesi Ners', 
            'Keperawatan'
        ]
    }
]

// insialisasi data awal
updateList();

// show-hide button setup
const form = document.querySelector('#show-hide');
const buttonShowHide = document.querySelector('#button-show-hide');

buttonShowHide.addEventListener("click", () => {
    if(form.style.display === "none")
    {
        form.style.display = "block";
        buttonShowHide.textContent = "Hide Form Add New Student";
    }
    else{
        form.style.display = "none";
        buttonShowHide.textContent = "Show Form Add New Student";
    }
});

     //funciton groupbox selection
//fakultas
const listFaculty = document.querySelector('#student-faculty');
const tagFaculty = document.createElement('option');

for(dF of daftarFakultas){
	let tagFakultas = document.createElement('option');
	let textFakultas = document.createTextNode(dF.fakultas);
	tagFakultas.appendChild(textFakultas);
	listFaculty.appendChild(tagFakultas);
}
//prodi
const listProdi = document.querySelector('#student-program-study');
const tagProdi = document.createElement('option');

listFaculty.addEventListener("click", (e) =>{
    const selected = e.target.value;
    let select;

    listProdi.innerHTML = '<select class="form-control input-size" style="font-size: 13px;" id="student-faculty"><option>-- SELECT PROGRAM OF STUDY --</option></select>';

    if     (selected == "Fakultas Ilmu Komputer")               { select = 0; }
    else if(selected == "Pascasarjana")                         { select = 1; }
    else if(selected == "Fakultas Filsafat")                    { select = 2; }
    else if(selected == "Fakultas Keguruan dan Ilmu Pendidikan"){ select = 3; }
    else if(selected == "Fakultas Ekonomi dan Bisnis")          { select = 4; }
    else if(selected == "Fakultas Pertanian")                   { select = 5; }
    else if(selected == "Fakultas Keperawatan")                 { select = 6; }

    for(s of daftarFakultas[select].jurusan)
    {
        let tagProdi = document.createElement('option');
        let textProdi = document.createTextNode(s);    

        tagProdi.appendChild(textProdi);
        listProdi.appendChild(tagProdi);
    }
});

    //function to add new student
    //button add student
const buttonAdd = document.querySelector("#button-add-student");

buttonAdd.addEventListener("click", () =>{

    const newNIM = document.querySelector("#student-ID").value;
    const newFullName = document.querySelector("#student-full-name").value;
    const newGender = document.querySelector("input[name='custom-radio']:checked").value;
    const newFaculty = document.querySelector("#student-faculty").options[document.querySelector("#student-faculty").selectedIndex].value;
    const newProgramStudy = document.querySelector("#student-program-study").options[document.querySelector("#student-program-study").selectedIndex].value;

    const newAdded = document.querySelector('#new-added');
    newAdded.innerHTML = "";

    // input data student ke list
    if(newNIM !== "" && newFullName !== "" && newFaculty !== "-- SELECT FACULTY --" && newProgramStudy !=="-- SELECT PROGRAM OF STUDY --")
    {
        let isNumber = document.formInput.formNumber.value;
        if(isNaN(isNumber))
        {
            alert("NIM tidak boleh di isi huruf");
            updateList();
        }
        else
        {
            students.push({
                NIM : newNIM,
                fullName : newFullName,
                genders : newGender,
                faculty : newFaculty,
                prodi : newProgramStudy
            });
            
            updateList();
            document.formInput.reset();
            alert(`${newFullName} was added.`);
        }
    }
    else
    {
        alert("Data belum lengkap");
        updateList();
    }
});

    // function list
function updateList()
{
    const newAdded = document.querySelector('#new-added');

    for(student of students)
    {
        const trTag = document.createElement("tr");
        for(value in student)
        {
            const tdTag = document.createElement("td");
            const text = document.createTextNode(student[value]);
            tdTag.appendChild(text);

            trTag.appendChild(tdTag);
            newAdded.appendChild(trTag);
        }
        // delete button
        const tdTag = document.createElement("td");
        const icon = `<button type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
        tdTag.innerHTML = icon;
        trTag.appendChild(tdTag);
    
    }
}

    // search student by name
const searchBox = document.querySelector("#search-student-name");

searchBox.addEventListener("input",() => {
    if(searchBox.length == 0)
    {
        updateList();
    }
    else
    {
        newAdded = document.querySelector("#new-added");
        newAdded.innerHTML = "";

        //filter the student
        let searched_student = students.filter((s) => {
            return s.fullName.toLowerCase().includes(searchBox.value.toLowerCase());
        });

        for(student of searched_student){

            let tr = document.createElement("tr");

            for(value in student){

                let td = document.createElement("td");
                td.appendChild(document.createTextNode(student[value]));

                tr.appendChild(td);
            }
            newAdded.appendChild(tr);
        }
    }
});

    // filter faculty
const listFacultyFilter = document.querySelector('#filter-faculty');

for(dfFilter of daftarFakultas){
	let tagFakultasFilter = document.createElement('option');
	let textFakultasFilter = document.createTextNode(dfFilter.fakultas);
	tagFakultasFilter.appendChild(textFakultasFilter);
	listFacultyFilter.appendChild(tagFakultasFilter);
}

const buttonFilter = document.querySelector("#button-filter-faculty");

buttonFilter.addEventListener("click",() => {
    const selected_faculty = listFacultyFilter.options[listFacultyFilter.selectedIndex].value;

    if(selected_faculty == "-- SELECT FACULTY --")
    {
        updateList();
    }
    else
    {
        newAdded = document.querySelector("#new-added");
        newAdded.innerHTML = "";

        //filter the student
        let searched_student = students.filter((s) => {
            return s.faculty ==  selected_faculty;
        });

        for(student of searched_student){
            const tdTag = document.createElement("td");
            let tr = document.createElement("tr");

            for(value in student){

                let td = document.createElement("td");
                td.appendChild(document.createTextNode(student[value]));

                tr.appendChild(td);
                newAdded.appendChild(tr);
            }
            // delete button
            const icon = `<button type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
            tdTag.innerHTML = icon;
            tr.appendChild(tdTag);
        }
        // delete button
        
    }
});

    // fukter prodi
const filter_by_program_study = document.querySelector("#filter-program-study");

for(i of daftarFakultas){

	for(j of i.jurusan){
		const parent = document.createElement("option");
		const child = document.createTextNode(j);
		parent.append(child);
		filter_by_program_study.appendChild(parent);
	}
}

const buttonFilterProdi = document.querySelector("#button-filter-prodi");

buttonFilterProdi.addEventListener("click",() => {
    const selected_prodi = filter_by_program_study.options[filter_by_program_study.selectedIndex].value;

    if(selected_prodi == "-- SELECT PROGRAM OF STUDY --")
    {
        updateList();
    }
    else
    {
        newAdded = document.querySelector("#new-added");
        newAdded.innerHTML = "";

        //filter the student
        let searched_student = students.filter((s) => {
            return s.prodi ==  selected_prodi;
        });

        for(student of searched_student){
            const tdTag = document.createElement("td");
            let tr = document.createElement("tr");

            for(value in student){

                let td = document.createElement("td");
                td.appendChild(document.createTextNode(student[value]));

                tr.appendChild(td);
                newAdded.appendChild(tr);
            }
            // delete button
            const icon = `<button type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
            tdTag.innerHTML = icon;
            tr.appendChild(tdTag);
        }
        // delete button
        
    }
});
