package helloworld;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class HelloWorldServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public HelloWorldServlet() {
        super();
    }

    private void handleCORS(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
List<String> allowedUserId = Arrays.asList(getServletContext().getInitParameter("userIds").trim().split(","));
    	
        String clientOrigin = request.getHeader("origin");
       
        String userId = request.getParameter("userId");
        if( userId != null)
        	userId = userId.trim();
        if( allowedUserId.contains(userId)){
        	response.setHeader("Access-Control-Allow-Origin", clientOrigin);
        }
    }
    private void fillResponse(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
    	String ipAddress = request.getHeader("x-forwarded-for");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
    	if( ipAddress.equals("0:0:0:0:0:0:0:1"))
        	response.getWriter().println("local one");
        else
        	response.getWriter().println("Hello World!");
    }
    private void trace(HttpServletRequest request){
    	String userId = request.getParameter("userId");
    	if( userId != null){
    		System.out.println("User id: " + userId + " at thread: " +
    	 Thread.currentThread().getId() + "current instance: " + this);
    	try {
			Thread.currentThread().sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	}
    }
    /*
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	handleCORS(request, response);
    	fillResponse(request, response);
    	
    	trace(request);
    }*/
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	testXSS(request, response);
    }
    private void testXSS(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
    	String userAgent = req.getHeader("user-agent");
    	String employeeID = req.getParameter("id");
    	String clientBrowser = "Unknonw";
    	if( userAgent != null){
    	  clientBrowser = userAgent;
    	}
    	req.setAttribute("client.browser", clientBrowser);
    	req.setAttribute("id", employeeID);
    	System.out.println(userAgent);
    	System.out.println(employeeID);
    	req.getRequestDispatcher("/showBrowser.jsp").forward(req,resp);
    	
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
