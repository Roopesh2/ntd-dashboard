# auth

## pre production

add users

collect emails --> add to sign in provider --> approved_list

## post production

auth -- > if (id in approved_list) ---> display data
|
|
￬
Error page

## Datas

users? -> doc -> Names, mail, ...?
expenses -> doc -> #, amt, name, linked_job<job.#>
jobs -> doc -> #, client, start, end, cost, return
linked_exp<exp.#>
edit_history -> doc -> what, who, when, from, to, remark?
