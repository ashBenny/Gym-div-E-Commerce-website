class ApiFeatures {
    constructor(query,queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        const keyword = this.queryString.keyword ? {
        name : {
            $regex : this.queryString.keyword,                     // match the charactor combination in strings
            $options : 'i'                                         // to avoid case sensitive problems in search
        }} : {}
        this.query = this.query.find({...keyword})
        return this;
    }
 
    filter() {
        const queryCopy = {...this.queryString};

        // remove fields from query
        const removeField = ["keyword", "limit", "page"];
        removeField.forEach(item => delete queryCopy[item]);


        // Price/Ratings filtering ( Between minimum value and maximum value )
        let queryString = JSON.stringify(queryCopy);

        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}` ) // Regular expression
        
        // console.log(queryString);

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    };

    pagination(productsPerPage) {

        const currentPage = Number(this.queryString.page);
        const skipPage = productsPerPage * (currentPage - 1);

        this.query = this.query.limit(productsPerPage).skip(skipPage);
        return this;
    };
};


module.exports = ApiFeatures;

