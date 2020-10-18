const studnents = [
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
        gender: "Female",
        faculty: "Unklab Business School",
        prodi: "Accounting"
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
	},
]

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

    if(selected == "Fakultas Ilmu Komputer")                    { select = 0; }
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














// studnents.forEach((st) =>{
//     console.log(st);
// })

// const femaleStudent = studnents.filter((st) => {
//     if(st.gender === "Female")
//     {
//         return true;
//     }
// });
// console.log(femaleStudent[0].fullName);

// const currentYear = new Date();
// console.log(currentYear.getDate);

//immediately invoked
// const test = ((st) => st*st)(5);
// console.log(test);

    // function Person(firstName, age)
    // {
    //     this.firstName = firstName;
    //     this.age = age;
    // }

    // const instPerson = new Person("Johhny", 21);
    // console.log(instPerson); 


