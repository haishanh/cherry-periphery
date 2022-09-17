---
sidebar_position: 3
---

# Backup

Cherry is using SQLite, backup is fairly easy and straightforward. Just connect to database and use the [`.backup` command](https://sqlite.org/cli.html#special_commands_to_sqlite3_dot_commands_). Below example backups the current database to a file called `cherry_backup01.sqlite`.

```bash
sqlite3 /data/cherry.sqlite ".backup '/data/cherry_backup01.sqlite'"
```

Since Cherry will run in a Docker container, the tricky part is usually: identifying where to place the backup file and fighting with directory/file permission.

A good practice is probably run this backup regularly (like every 1 hour) with a Cron Job, use datetime as part of the backup file name and then upload the backup file to an object storage bucket.

## Other Solutions

- [Litestream](https://github.com/benbjohnson/litestream), streaming replication for SQLite.
