using System.Collections;
using UnityEngine;

public class LipSyncController : MonoBehaviour
{
    public SkinnedMeshRenderer faceMesh;
    public int mouthBlendshapeIndex = 6;  
    public float openAmount = 85f;
    public float speed = 12f;

    private bool talking = false;

    public void StartLipSync(AudioSource audio)
    {
        if (!talking)
            StartCoroutine(LipRoutine(audio));
    }

    public void StopLipSync()
    {
        talking = false;
        faceMesh.SetBlendShapeWeight(mouthBlendshapeIndex, 0);
    }

    IEnumerator LipRoutine(AudioSource audio)
    {
        talking = true;

        while (audio != null && audio.isPlaying)
        {
            yield return AnimateMouth(openAmount, 0.08f);
            yield return AnimateMouth(0, 0.08f);
        }

        faceMesh.SetBlendShapeWeight(mouthBlendshapeIndex, 0);
        talking = false;
    }

    IEnumerator AnimateMouth(float target, float dur)
    {
        float start = faceMesh.GetBlendShapeWeight(mouthBlendshapeIndex);
        float t = 0f;

        while (t < dur)
        {
            t += Time.deltaTime * speed;
            float weight = Mathf.Lerp(start, target, t / dur);
            faceMesh.SetBlendShapeWeight(mouthBlendshapeIndex, weight);
            yield return null;
        }
    }
}
