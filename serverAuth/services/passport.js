import passport from 'passport';
import User from '../models/user';
import config from '../config';
import JwtStrategy from 'passport-jwt'.Strategy;
import ExtractJwt from 'passport-jwt'.ExtractJwt;
