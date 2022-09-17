---
sidebar_position: 2
---

# Operation

The Cherry Docker image came with a CLI also called `cherry`. The CLI wraps around the **internal HTTP admin API**. A bunch of administrative operations can be done use the `cherry` CLI.

## Create user


```bash
docker exec cherry cherry create-user <email> <password>
```

:::tip Tips

The above command assumes your Cherry container is named `cherry`. The first "cherry" is the container name, the second one is the name of the CLI.

:::

:::info note

You can create user this way even with public registration disabled.

:::


## Update existing user's password

As Admin you have the super power to update an user's password without their old password.

```bash
docker exec cherry cherry update-user-password <email> <newPassword>
```

## Delete a user

```bash
docker exec cherry cherry delete-user <id> <email>
```

:::info note

User's resources will also be deleted.

:::
