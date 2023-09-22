import Mock from 'mockjs'
const arr = []
for (let i = 0; i < 10; i++) {
    arr.push({
        id: Mock.mock("@id"),
        name: Mock.mock("@cname"),
        date: Mock.mock("@date('yyyy-MM-dd')"),
        email: Mock.mock("@email"),
        city: Mock.mock("@city(true)")
    })
}

export default [{
        url: '/list',
        methods: 'get',
        response: () => {
            return arr
        }
    },
    {
        url: "/del/:id",
        methods: "delete",
        response: (req) => {
            const index = arr.findIndex((item) => item.id === req.query.id);
            if (index > -1) {
                arr.splice(index, 1);
                return { success: true }
            } else {
                return { success: false }
            }
        }
    },
    {
        url: "/edit/:id",
        method: "patch",
        response: ({ query, body }) => {
            const item = arr.find((item) => item.id === query.id);
            if (item) {
                item.name = body.name;
                item.city = body.city;
                return { success: true };
            } else {
                return { success: false };
            }
        },
    },
]