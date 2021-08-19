const tel = (tel) =>{
	tel = "" + tel;
	tel =tel.replace(tel.substring(3,7), "****")
	return tel;
}
export default{
	tel
}