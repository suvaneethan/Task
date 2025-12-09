using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;


public class LoginManager : MonoBehaviour
{
    public TMP_InputField emailInput; 
    public Button signInButton;
    public TextMeshProUGUI errorText;
    private void Start()
    {
        signInButton.onClick.AddListener(OnSignInClicked);
        errorText.text = "";
    }
    void OnSignInClicked()
    {
        string email = emailInput != null ? emailInput.text.Trim() : "";
        if (IsValidEmail(email))
        {
            // success
            SceneManager.LoadScene("HumanoidScene");
        }
        else
        {
            errorText.text = "Invalid login";

        }
    }
    bool IsValidEmail(string e)
    {
        if (string.IsNullOrEmpty(e)) return false;
        return e.Contains("@") && e.EndsWith(".com");
    }
}