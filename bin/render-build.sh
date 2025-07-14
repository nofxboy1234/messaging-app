#!/usr/bin/env bash
set -o errexit

rm -rf public/public
rm -rf public/vite/*
rm -rf tmp/cache/vite/*
bundle install
npm install
bundle exec rails vite:build
bundle exec rails db:migrate
