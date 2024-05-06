/**
 * 
 * @param {Request} req 
 * @param {Number} page 
 * @param {Number} pageSize 
 * @param {Sequelize} model 
 * @param {Object} query 
 * @returns 
 */
async function getDataWithPagination(req, page, pageSize, model, query) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    // console.log('pagination query fofrm paginate', query);


    const users = await model.findAndCountAll({
        offset,
        limit,
        where: {
            status: 1 
        },
        
        ...query,
    });

    const totalPages = Math.ceil(users.count / pageSize);
    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0];

    const response = {
        current_page: page,
        data: users.rows.map(user => user),
        first_page_url: `${baseUrl}?page=1`,
        from: offset + 1,
        last_page: totalPages,
        last_page_url: `${baseUrl}?page=${totalPages}`,
        links: generatePaginationLinks(baseUrl, page, totalPages),
        next_page_url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
        path: baseUrl,
        per_page: pageSize.toString(),
        prev_page_url: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
        to: offset + users.rows.length,
        total: users.count,
    };

    return response;
}

/**
 * 
 * @param {String} baseUrl 
 * @param {Number} currentPage 
 * @param {Number} totalPages 
 * @returns 
 */
function generatePaginationLinks(baseUrl, currentPage, totalPages) {
    const links = [];

    // Previous page link
    links.push({
        url: currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : null,
        label: "<i class='fa fa-angle-left'></i>",
        active: false
    });

    // Page links
    for (let i = 1; i <= totalPages; i++) {
        links.push({
            url: `${baseUrl}?page=${i}`,
            label: i.toString(),
            active: i === parseInt(currentPage)
        });
    }

    // Next page link
    links.push({
        url: currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : null,
        label: "<i class='fa fa-angle-right'></i>",
        active: false
    });

    return links;
}

module.exports.generatePaginationLinks = generatePaginationLinks;

/**
 * 
 * @param {Request} req 
 * @param {Number} page 
 * @param {Number} pageSize 
 * @param {Sequelize} model 
 * @param {Object} query 
 * @returns
 * ```js
    await paginate(req, 1, 10, User);
 */
module.exports.taskUserPaginate = async(req, model = null, pageSize = 10, query) => {
    if(model){
        let response = await getDataWithPagination(req, req.query.page || 1, pageSize, model, query);
        return response;
    }

    return {};
}

// Example usage
// async function main(req) {
//     const page = 2;
//     const pageSize = 2;
//     const response = await getDataWithPagination(req, page, pageSize);
//     console.log(response);
// }