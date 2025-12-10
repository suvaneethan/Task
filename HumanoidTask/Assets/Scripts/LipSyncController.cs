using UnityEngine;

public class LipSyncController : MonoBehaviour
{
    public SkinnedMeshRenderer faceMesh;      // Mouth  (MTH_DEF)
    public int mouthBlendshapeIndex = 6;     
    public float sensitivity = 65f;           
    public float smoothSpeed = 10f;           

    private AudioSource audioSource;
    private float[] samples = new float[64];  
    private float currentMouthValue = 0f;

    public void StartLipSync(AudioSource source)
    {
        audioSource = source;
        enabled = true;
    }

    public void StopLipSync()
    {
        enabled = false;
        faceMesh.SetBlendShapeWeight(mouthBlendshapeIndex, 0);
    }

    void Update()
    {
        if (audioSource == null || !audioSource.isPlaying)
            return;

        // Read audio spectrum
        audioSource.GetSpectrumData(samples, 0, FFTWindow.BlackmanHarris);

        // Take the loudest frequency band
        float max = 0f;
        for (int i = 0; i < samples.Length; i++)
        {
            if (samples[i] > max) max = samples[i];
        }

        // Convert volume to blendshape weight
        float targetValue = Mathf.Clamp01(max * sensitivity) * 100f;

        // Smooth mouth movement
        currentMouthValue = Mathf.Lerp(currentMouthValue, targetValue, Time.deltaTime * smoothSpeed);

        faceMesh.SetBlendShapeWeight(mouthBlendshapeIndex, currentMouthValue);
    }
}
