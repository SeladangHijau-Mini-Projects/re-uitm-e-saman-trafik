module.exports = {
    apps: [
        {
            name: process.env.APP_NAME,
            script: 'npm',
            args: 'start',
            error_file: `error.log`,
            out_file: `out.log`,
            time: true,
            max_memory_restart: process.env.PM2_MAX_MEM_RESTART,
        },
    ],
};
