module.exports = [
    {
        src: './build/**/*',
        remotePath: '/home/dylan/wxyx/htdocs',
        server: {
            ignoreErrors: true,
            sshConfig: {
                host: '120.79.34.203',
                username: 'dylan',
                password: 'dylan123123'
            }
        },
    },
    // {
    //     src: './build/**/*.html',
    //     remotePath: 'remotePath2',
    //     server: {
    //         ignoreErrors: true,
    //         sshConfig: {
    //             host: 'host',
    //             username: 'username',
    //             password: 'password'
    //         }
    //     },
    // },
];
