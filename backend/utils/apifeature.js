class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    filter(){
        const keyword = {...this.queryStr} ;

        // Removing Some Fields For Category Filter

        const removeFields = ["page","limit"];
        removeFields.forEach((key)=> delete keyword[key]);
        
        this.query = this.query.find(keyword);
        return this;
    }




    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;