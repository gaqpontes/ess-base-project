export default class Env {
  public static ENV = process.env.ENV || 'DEV';
  public static PORT = process.env.PORT || 5001;
  public static DBUSER = process.env.DBUSER || '';
  public static DBPASSWORD = process.env.DBPASSWORD || '';
  public static DBURI = process.env.DBURI || '';
}
