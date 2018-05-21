
import com.gameci.thelast.MainApp;
import com.gameci.thelast.persistence.GameServices;
import com.gameci.thelast.persistence.GameServicesException;
import com.gameci.thelast.persistence.GameServicesREDIS;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author andres
 */
public class REDISTest {
    MainApp main= new MainApp();
    GameServices gss = new GameServicesREDIS();
    
    @Test
    public void createMap() throws GameServicesException{
        gss.createNewMap(1);
        assertEquals(1,1);
    }
    
}
