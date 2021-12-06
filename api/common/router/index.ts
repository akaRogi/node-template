export = {
    demo: {
        type: 'get',
        verifyValue: {
            current: { type: Number, name: "页数", required: true, default: 1 },
            pageSize: { type: Number, name: "行数", required: true, default: 10 }
        }
    },
}
