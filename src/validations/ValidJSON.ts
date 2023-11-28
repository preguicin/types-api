function isValidJSON(json: string | object): boolean{
	if(typeof json === "string"){
		try{
			const jsonObj: object = JSON.parse(json);
			return jsonEntries(jsonObj);
		}catch(err){
			return false;
		}
	}
	return jsonEntries(json);
}

function jsonEntries(json: object){
	return Object.entries(json).length === 0 ?  false :  true;
}

export { isValidJSON };