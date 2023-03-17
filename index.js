var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stuDBName="STUDENT-TABLE";
var stuRelationName="STU-REL"
var connToken="90932961|-31949275450077063|90949383";

$("#stuno").focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getStunoAsJsonObj(){
    var stuno=$("#stuno").val();
    var jsonStr={
        rollno:stuno
    }
    return JSON.stringify(jsonStr);v
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#stuname").val(record.fullname);
    $("#stuclass").val(record.class);
    $("#birth").val(record.dateofbirth);
    $("#address").val(record.studentaddress);
    $("#enrdate").val(record.enrollmentdate);

}

function resetForm() {
    $("#stuno").val('');
    $("#stuname").val('');
    $("#stuclass").val('');
    $("#birth").val('');
    $("#address").val('');
    $("#enrdate").val('');
    $("#stuno").prop('disabled', false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stuno").focus();
}

function validateData(){
    var stuno,stuname,stuclass,birth,address,enrdata;
    stuno=$("#stuno").val();
    stuname=$("#stuname").val();
    stuclass=$("#stuclass").val();
    birth=$("#birth").val();
    address=$("#address").val();
    enrdata=$("#enrdate").val();
    if(stuno===""){
        alert("Student number missing");
        $("#stuid").focus();
        return "";
    }
    if(stuname===""){
        alert("Student name missing");
        $("#stuname").focus();
        return "";
    }
    if(stuclass===""){
        alert("Student Class missing");
        $("#stuclass").focus();
        return "";
    }
    if(birth===""){
        alert("Student date of birth missing");
        $("#birth").focus();
        return "";
    }
    if(address===""){
        alert("Student Address missing");
        $("#address").focus();
        return "";
    }
    if(enrdata===""){
        alert("Student Enrollment data missing");
        $("#enrdata").focus();
        return " ";
    }
    var jsonStrObj={
        rollno:stuno,
        fullname:stuname,
        class:stuclass,
        dateofbirth:birth,
        studentaddress:address,
        enrollmentdate:enrdate
    };
    return JSON.stringify(jsonStrObj);

}

function getStu(){
    var stunoJsonObj=getStunoAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,stunoJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL)
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status===400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();

    }else if(resJsonObj.status===200){
        $("#stuno").prop('disabled',true);
        fillData(resJsonObj);
    
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({ async: true });
    
    resetForm();
    $('#stuno').focus();
}
function changeData(){
    $('#change').prop('disabled',true);
    jsonChg = validateData();
    var updateRequest = createUPDATERequest(connToken,jsonChg, stuDBName, stuRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $('#stuno').focus();

}