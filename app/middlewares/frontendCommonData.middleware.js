
module.exports = async (server, req) => {
    server.locals.commonData = {
       

    };

    server.locals = {
        ...server.locals,

        seo_title: 'CRM',
        seo_keyword: 'CRM',
        seo_schematags: 'CRM',
        seo_description: 'CRM',
        seo_image: 'CRM',

    }

}