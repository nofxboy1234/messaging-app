#!/usr/bin/env bash
set -o errexit

rm -rf public/vite/*
bundle install
npm install
bundle exec rails vite:build
bundle exec rails db:migrate
