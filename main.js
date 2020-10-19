//JSON untuk daftar mahasiswa 
let daftarMahasiswa = [
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

//JSON untuk daftar fakultas
const daftarFakultas = [
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
        fakultas:"Fakultas Ilmu Komputer",
        jurusan: [
            'Informatika', 
            'Sistem Informasi'
        ]
	},
	{
		fakultas:"Fakultas Keperawatan",
		jurusan: [
            'Profesi Ners', 
            'Keperawatan'
        ]
    },
    {
        fakultas:"Akademi Sekertaris Manajemen Indonesia Klabat",
        jurusan: [
            'Sekertaris (D3)'
        ]
    }
]

//Load awal data tabel
updateList();

//Button Show-Hide
const formInput = document.querySelector('#show-hide');
const buttonShowHide = document.querySelector('#button-show-hide');

buttonShowHide.addEventListener("click", () => 
{
    if(formInput.style.display === "none")
    {
        formInput.style.display = "block";
        buttonShowHide.textContent = "Hide Form Add New Student";
    }
    else
    {
        formInput.style.display = "none";
        buttonShowHide.textContent = "Show Form Add New Student";
    }
});

//Dropdown - Input selection
//Fakultas
const listFakultas = document.querySelector('#student-faculty');

for(dF of daftarFakultas)
{
	let tagFakultas = document.createElement('option');
	let textFakultas = document.createTextNode(dF.fakultas);
	tagFakultas.appendChild(textFakultas);
	listFakultas.appendChild(tagFakultas);
}

//Program Studi
const listProdi = document.querySelector('#student-program-study');
const tagProdi = document.createElement('option');

listFakultas.addEventListener("click", (e) =>
{
    const selected = e.target.value;
    let select = 0;

    listProdi.innerHTML = '<select class="form-control input-size" style="font-size: 13px;" id="student-faculty"><option>-- SELECT PROGRAM OF STUDY --</option></select>';

    if     (selected == "Pascasarjana")                                 { select = 0; }
    else if(selected == "Fakultas Filsafat")                            { select = 1; }
    else if(selected == "Fakultas Keguruan dan Ilmu Pendidikan")        { select = 2; }
    else if(selected == "Fakultas Ekonomi dan Bisnis")                  { select = 3; }
    else if(selected == "Fakultas Pertanian")                           { select = 4; }
    else if(selected == "Fakultas Ilmu Komputer")                       { select = 5; }
    else if(selected == "Fakultas Keperawatan")                         { select = 6; }
    else if(selected == "Akademi Sekertaris Manajemen Indonesia Klabat"){ select = 7; }

    for(s of daftarFakultas[select].jurusan)
    {
        let tagProdi = document.createElement('option');
        let textProdi = document.createTextNode(s);    

        tagProdi.appendChild(textProdi);
        listProdi.appendChild(tagProdi);
    }
});

//Function to add new student
//Button - Add student
const buttonAdd = document.querySelector("#button-add-student");

buttonAdd.addEventListener("click", () =>
{
    const newNIM = document.querySelector("#student-ID").value;
    const newFullName = document.querySelector("#student-full-name").value;
    const newGender = document.querySelector("input[name='custom-radio']:checked").value;
    const newFaculty = document.querySelector("#student-faculty").options[document.querySelector("#student-faculty").selectedIndex].value;
    const newProgramStudy = document.querySelector("#student-program-study").options[document.querySelector("#student-program-study").selectedIndex].value;

    const newAdded = document.querySelector('#new-added');
    newAdded.innerHTML = "";

    //Validasi jika ada input yang tidak diisi
    if(newNIM !== "" && newFullName !== "" && newFaculty !== "-- SELECT FACULTY --" && newProgramStudy !=="-- SELECT PROGRAM OF STUDY --")
    {
        //Validasi jika ada huruf dalam NIM
        const isNumber = document.formInput.formNumber.value;
        if(isNaN(isNumber))
        {
            alert("NIM tidak boleh di isi huruf");
            updateList();
        }
        else
        {
            //Push data ke JSON daftarMahasiswa
            daftarMahasiswa.push
            ({
                NIM : newNIM,
                fullName : newFullName,
                genders : newGender,
                faculty : newFaculty,
                prodi : newProgramStudy
            });
            
            updateList();
            document.formInput.reset();
            alert(`${newFullName} was added to the list.`);
        }
    }
    else
    {
        alert("Data belum lengkap");
        updateList();
    }
});

//Function - UpdateList tabel
function updateList()
{
    const newAdded = document.querySelector('#new-added');
    newAdded.innerHTML = "";

    for(student of daftarMahasiswa)
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
        //Button - Delete
        const tdTag = document.createElement("td");
        const icon = `<button onclick="deleteRow(this)" type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
        tdTag.innerHTML = icon;
        trTag.appendChild(tdTag);
    }
}

//Function - Search student by name
const searchBox = document.querySelector("#search-student-name");

searchBox.addEventListener("input",() => 
{
    if(searchBox.length == 0)
    {
        updateList();
    }
    else
    {
        newAdded = document.querySelector("#new-added");
        newAdded.innerHTML = "";

        //Filter student
        const searchedStudent = daftarMahasiswa.filter((s) => 
        {
            return s.fullName.toLowerCase().includes(searchBox.value.toLowerCase());
        });

        for(student of searchedStudent)
        {
            const trTag = document.createElement("tr");

            for(value in student)
            {
                const tdTag = document.createElement("td");
                tdTag.appendChild(document.createTextNode(student[value]));

                trTag.appendChild(tdTag);
                newAdded.appendChild(trTag);
            }
            const td = document.createElement("td");
            const icon = `<button type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
            td.innerHTML = icon;
            trTag.appendChild(td);  
        }
    }
});

//Filter - faculty
const listFacultyFilter = document.querySelector('#filter-faculty');

for(filterDF of daftarFakultas)
{
	const tagFakultasFilter = document.createElement('option');
    const textFakultasFilter = document.createTextNode(filterDF.fakultas);
    
	tagFakultasFilter.appendChild(textFakultasFilter);
	listFacultyFilter.appendChild(tagFakultasFilter);
}

const buttonFilter = document.querySelector("#button-filter-faculty");

buttonFilter.addEventListener("click",() => 
{
    const selectedFaculty = listFacultyFilter.options[listFacultyFilter.selectedIndex].value;

    if(selectedFaculty == "-- SELECT FACULTY --")
    {
        updateList();
    }
    else
    {
        newAdded = document.querySelector("#new-added");
        newAdded.innerHTML = "";

        //Filter the faculty
        const searched_student = daftarMahasiswa.filter((s) => {
            return s.faculty ==  selectedFaculty;
        });

        for(student of searched_student){
            const tdTag = document.createElement("td");
            const trTag = document.createElement("tr");

            for(value in student){

                const tdTag = document.createElement("td");
                tdTag.appendChild(document.createTextNode(student[value]));

                trTag.appendChild(tdTag);
                newAdded.appendChild(trTag);
            }
            //Button - Delete
            const icon = `<button type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
            tdTag.innerHTML = icon;
            trTag.appendChild(tdTag);
        }
    }
});

//Filter - Prodi
const filterProgramStudy = document.querySelector("#filter-program-study");

for(df of daftarFakultas)
{

	for(j of df.jurusan){
		const tagOption = document.createElement("option");
		const text = document.createTextNode(j);
		tagOption.append(text);
		filterProgramStudy.appendChild(tagOption);
	}
}

const buttonFilterProdi = document.querySelector("#button-filter-prodi");

buttonFilterProdi.addEventListener("click",() => 
{
    const selectedProdi = filterProgramStudy.options[filterProgramStudy.selectedIndex].value;

    if(selectedProdi == "-- SELECT PROGRAM OF STUDY --")
    {
        updateList();
    }
    else
    {
        newAdded = document.querySelector("#new-added");
        newAdded.innerHTML = "";

        //filter the student
        const searchedStudent = daftarMahasiswa.filter((s) => 
        {
            return s.prodi ==  selectedProdi;
        });

        for(student of searchedStudent)
        {
            const tdTag = document.createElement("td");
            const trTag = document.createElement("tr");

            for(value in student){

                const td = document.createElement("td");
                td.appendChild(document.createTextNode(student[value]));

                trTag.appendChild(td);
                newAdded.appendChild(trTag);
            }
            // delete button
            const icon = `<button type="button" class="btn btn-danger pl-2 pr-2 pt-1 pb-1"><i class="fas fa-user-minus"></i></button>`;
            tdTag.innerHTML = icon;
            trTag.appendChild(tdTag);
        }
    }
});

//Button - Delete
function deleteRow(btn) 
{
	var row = btn.parentNode.parentNode;
	newNIM = (row.querySelector("tr td").textContent);

	const cf = confirm(`Are you sure to delete this student?`);
 
    if(cf == true)
    {		
        daftarMahasiswa = daftarMahasiswa.filter((s) =>
        {
			return s.NIM != newNIM;
		});

		updateList();
        console.log(daftarMahasiswa.length);
	}
}
