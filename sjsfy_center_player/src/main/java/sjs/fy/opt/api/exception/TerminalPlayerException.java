package sjs.fy.opt.api.exception;

/**
 * Created by Administrator on 2016/11/20.
 */
public class TerminalPlayerException extends Exception{
    public enum TerminalPlayerExceptionType{
        HOST_TO_DEVICEID,PRE_LOGION
    }

    public TerminalPlayerExceptionType getTerminalPlayerExceptionType() {
        return terminalPlayerExceptionType;
    }

    public void setTerminalPlayerExceptionType(TerminalPlayerExceptionType terminalPlayerExceptionType) {
        this.terminalPlayerExceptionType = terminalPlayerExceptionType;
    }

    private TerminalPlayerExceptionType terminalPlayerExceptionType;

    public TerminalPlayerException(String msg,TerminalPlayerExceptionType terminalPlayerExceptionType){
        super(msg);
        this.terminalPlayerExceptionType = terminalPlayerExceptionType;
    }
}
