function editRow(rowNumber){
    document.getElementById("edit_btn" + rowNumber).style.display="none";
    document.getElementById("save_btn" + rowNumber).style.display="block";

    var name = document.getElementById("name_row" + rowNumber);
    var age = document.getElementById("age_row" + rowNumber);
    var city = document.getElementById("city_row" + rowNumber);

    var name_data = name.innerHTML;
    var age_data = age.innerHTML;
    var city_data = city.innerHTML;

    name.innerHTML = "<input type='text' id='name_text" + rowNumber +"' value='" + name_data +"'>";
    //`<input type="text" id="name_text${rowNumber}" value="${name_data}">`;
    age.innerHTML = "<input type='text' id='age_text" + rowNumber +"' value='" + age_data +"'>";
    //`<input type="text" id="age_text${rowNumber}" value="${age_data}">`;
    city.innerHTML = "<input type='text' id='city_text" + rowNumber +"' value='" + city_data +"'>";
    //`<input type="text" id="city_text${rowNumber}" value="${city_data}"`;

}

function saveRow(rowNumber){
    var nameValue = document.getElementById("name_text"+rowNumber).value;
    var ageValue = document.getElementById("age_text"+rowNumber).value;
    var cityValue = document.getElementById("city_text"+rowNumber).value;

    document.getElementById("name_row"+rowNumber).innerHTML = nameValue;
    document.getElementById("age_row" + rowNumber).innerHTML = ageValue;
    document.getElementById("city_row" + rowNumber).innerHTML = cityValue;

    document.getElementById("edit_btn" + rowNumber).style.display="block";
    document.getElementById("save_btn" + rowNumber).style.display="none";
}

function deleteRow(rowNumber){
    document.getElementById("row"+rowNumber).innerHTML="";
}