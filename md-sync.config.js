module.exports = [
    {
        src: './build/**/*',
        remotePath: 'remotePath',
        server: {
            ignoreErrors: true,
            sshConfig: {
                host: 'host',
                username: 'username',
                password: 'password'
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
