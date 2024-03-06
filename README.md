# Bosco
Ce dépôt GitHub contient les sources de la carte Bosco.

# Installation

## Prérequis

Disposer d'un mviewer déjà installé.

## via un clone

Au sein de votre mviewer réalisez les commandes suivantes :

> Le nom du répertoire `/apps` est à changer selon votre instance ou dossier qui contiendra bosco

```
cd /apps
git clone https://github.com/geosas/bosco.git
```

Vous pouvez maintenant disposer de bosco via l'URl :

https://monsiteweb.fr/mviewer?config=apps/bosco/bosco/default.xml

> le répertoire de carte est dans le répertoire /bosco du dépôt /bosco. La redondance est actuellement volntaire.

## via un clone et un lien symbolique

> Cette méthode concerne un environnement Linux. Pour Windows, vous pouvez créer des liens symboliques avec l'outil `mklink`

Si vous ne souhaitez pas cloner bosco dans mviewer directement, vous devrez créer un lien symbolique entre le répertoire /apps de votre mviewer (ou autre répertoire de consultation) et le répertoire /bosco :

> Les chemins sont à adapter !

```
cd /home/user/git
git clone https://github.com/geosas/bosco.git
ln -s /home/user/git/bosco/bosco /var/www/mviewer/apps/bosco
```
Ici, l'URL sera plus élégante car on pointe directement le répertoire `/apps/bosco` vers `git/bosco/bosco`

> N'oubliez pas d'adapter les droits si nécessaire.

Vous pouvez maintenant disposer de bosco via l'URl :

https://monsiteweb.fr/mviewer?config=apps/bosco/default.xml
