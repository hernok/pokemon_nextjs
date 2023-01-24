import { sequelize } from './connection';
import { Model, DataTypes } from 'sequelize';

export class Pokemon extends Model {}
Pokemon.init({ name: DataTypes.STRING }, { sequelize, modelName: 'pokemon' });
