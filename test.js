/**
 *\

 {
    "current_page": 2,
    "data": [
        {
            "id": 1,
            "name": "aaa",
        },
        {
            "id": 2,
            "name": "bbb",
        },
    ],
    "first_page_url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=1",
    "from": 5,
    "last_page": 72,
    "last_page_url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=72",
    "links": [
        {
            "url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=1",
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=1",
            "label": "1",
            "active": false
        },
        {
            "url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=2",
            "label": "2",
            "active": true
        },
        {
            "url": null,
            "label": "...",
            "active": false
        },
        {
            "url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=71",
            "label": "71",
            "active": false
        },
        {
            "url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=3",
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=3",
    "path": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor",
    "per_page": "4",
    "prev_page_url": "https:\/\/domain.com\/api\/v1\/category\/51\/Monitor?page=1",
    "to": 8,
    "total": 285
}
 */



// This is just for demonstration. In your actual application, you'd pass the req object from your route handler.
const req = {
    protocol: 'https',
    get: () => 'domain.com',
    originalUrl: '/api/v1/category/51/Monitor?page=2',
};
main(req);
